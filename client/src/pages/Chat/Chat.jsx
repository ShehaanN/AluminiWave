import { useState, useEffect, useCallback, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import mdp from "../../assets/mdp.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Sidebar from "../Sidebar/Sidebar";
import { supabase } from "../../supabaseClient";
import { getUserData } from "../../services/dataService";
import { format, formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Chat = () => {
  // User and Auth State
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");

  // Chat State
  const [inputMessage, setInputMessage] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Loading States
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  const messagesEndRef = useRef(null);
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Fetch initial user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();
        if (data) {
          setUserType(data.profile.role);
        }
        if (!data) throw new Error("No user data found");
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!userData?.userId) return;

    setLoadingConversations(true);
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          id,
          updated_at,
          participant1:profiles!participant1_id (id, full_name, profile_photo_url),
          participant2:profiles!participant2_id (id, full_name, profile_photo_url),
          messages!messages_conversation_id_fkey (
            content,
            created_at,
            sender_id
          )
        `
        )
        .or(
          `participant1_id.eq.${userData.userId},participant2_id.eq.${userData.userId}`
        )
        .order("updated_at", { ascending: false });

      if (error) throw error;

      const formattedConversations = data.map((convo) => {
        const otherParticipant =
          convo.participant1.id === userData.userId
            ? convo.participant2
            : convo.participant1;

        // Get the last message from the messages array
        const lastMessage = convo.messages[0];

        return {
          id: convo.id,
          name: otherParticipant.full_name,
          avatar: otherParticipant.profile_photo_url,
          message: lastMessage?.content || "No messages yet",
          time: lastMessage?.created_at || convo.updated_at,
          isOnline: false,
          status: "Offline",
        };
      });

      setConversations(formattedConversations);

      if (formattedConversations.length > 0 && !activeConversationId) {
        setActiveConversationId(formattedConversations[0].id);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoadingConversations(false);
    }
  }, [userData, activeConversationId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  //  fetchContacts
  useEffect(() => {
    const fetchContacts = async () => {
      if (!userData?.userId) return;

      setLoadingContacts(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select(
            `
            id,
            full_name,
            role,
            profile_photo_url,
            institute,
            current_job_title,
            created_at
          `
          )
          .neq("id", userData.userId)
          .eq("is_superadmin", false)
          .order("full_name");

        if (error) throw error;

        const formattedContacts = data.map((profile) => ({
          id: profile.id,
          name: profile.full_name,
          role: profile.role,
          avatar: profile.profile_photo_url,
          subtitle:
            profile.current_job_title || profile.institute || profile.role,
          createdAt: profile.created_at,
        }));

        setContacts(formattedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        alert("Failed to load contacts. Please try again.");
      } finally {
        setLoadingContacts(false);
      }
    };

    if (isNewChatOpen) {
      fetchContacts();
    }
  }, [isNewChatOpen, userData?.userId]);

  // Fetch messages for active conversation
  const fetchMessages = useCallback(async () => {
    if (!activeConversationId || !userData?.userId) return;

    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          id,
          content,
          created_at,
          sender_id,
          sender:profiles!sender_id (full_name, profile_photo_url)
        `
        )
        .eq("conversation_id", activeConversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        sender: msg.sender.full_name,
        message: msg.content,
        time: format(new Date(msg.created_at), "h:mm a"),
        isSelf: msg.sender_id === userData.userId,
      }));

      setMessages(formattedMessages);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  }, [activeConversationId, userData, scrollToBottom]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Real-time subscriptions

  useEffect(() => {
    if (!userData?.userId) return;

    const subscription = supabase
      .channel("chat_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeConversationId}`,
        },
        async (payload) => {
          const newMessage = payload.new;

          // Only add message if it's not from current user (to avoid duplicates)
          if (newMessage.sender_id !== userData.userId) {
            // Fetch sender info
            const { data: senderData } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", newMessage.sender_id)
              .single();

            setMessages((prev) => [
              ...prev,
              {
                id: newMessage.id,
                sender: senderData?.full_name || "Other",
                message: newMessage.content,
                time: format(new Date(newMessage.created_at), "h:mm a"),
                isSelf: false,
              },
            ]);

            // Update conversation list
            setConversations((prev) =>
              prev.map((convo) =>
                convo.id === activeConversationId
                  ? {
                      ...convo,
                      message: newMessage.content,
                      time: newMessage.created_at,
                    }
                  : convo
              )
            );

            scrollToBottom();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userData, activeConversationId, scrollToBottom]);

  // Message handlers
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !userData?.userId || !activeConversationId)
      return;

    setSendingMessage(true);
    try {
      const currentTime = new Date().toISOString();
      const messageContent = inputMessage.trim();

      // Get conversation data
      const { data: conversationData, error: conversationError } =
        await supabase
          .from("conversations")
          .select(`participant1_id, participant2_id`)
          .eq("id", activeConversationId)
          .single();

      if (conversationError) throw conversationError;

      // Determine receiver_id
      const receiver_id =
        conversationData.participant1_id === userData.userId
          ? conversationData.participant2_id
          : conversationData.participant1_id;

      // Send message
      const { data: newMessage, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: activeConversationId,
          sender_id: userData.userId,
          receiver_id: receiver_id,
          content: messageContent,
          created_at: currentTime,
        })
        .select(
          `
          id,
          content,
          created_at,
          sender_id,
          sender:profiles!sender_id (full_name, profile_photo_url)
        `
        )
        .single();

      if (error) throw error;

      // Update messages state immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: newMessage.id,
          sender: userData.profile?.full_name || "You",
          message: messageContent,
          time: format(new Date(currentTime), "h:mm a"),
          isSelf: true,
        },
      ]);

      // Update conversations list with new message
      setConversations((prevConversations) =>
        prevConversations.map((convo) =>
          convo.id === activeConversationId
            ? {
                ...convo,
                message: messageContent,
                time: currentTime,
              }
            : convo
        )
      );

      // Clear input
      setInputMessage("");

      // Scroll to bottom
      setTimeout(scrollToBottom, 100);

      // Update conversation in background
      await supabase
        .from("conversations")
        .update({ updated_at: currentTime })
        .eq("id", activeConversationId);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  };

  //  handleStartConversation
  const handleStartConversation = async (contactId) => {
    try {
      // Ensure we have valid IDs
      if (!userData?.userId || !contactId) {
        console.error("Missing user ID or contact ID");
        return;
      }

      // Sort IDs to maintain consistent ordering
      const p1 = userData.userId < contactId ? userData.userId : contactId;
      const p2 = userData.userId > contactId ? userData.userId : contactId;

      setLoadingContacts(true); // Show loading state

      // Check for existing conversation
      let { data: existing, error: checkError } = await supabase
        .from("conversations")
        .select(
          `
          id,
          participant1:profiles!participant1_id (id, full_name, profile_photo_url),
          participant2:profiles!participant2_id (id, full_name, profile_photo_url)
        `
        )
        .eq("participant1_id", p1)
        .eq("participant2_id", p2)
        .maybeSingle();

      if (checkError) throw checkError;

      let conversationId;

      if (existing) {
        // Use existing conversation
        conversationId = existing.id;
      } else {
        // Create new conversation
        const { data: newConvo, error: createError } = await supabase
          .from("conversations")
          .insert({
            participant1_id: p1,
            participant2_id: p2,
            updated_at: new Date().toISOString(),
          })
          .select(
            `
            id,
            participant1:profiles!participant1_id (id, full_name, profile_photo_url),
            participant2:profiles!participant2_id (id, full_name, profile_photo_url)
          `
          )
          .single();

        if (createError) throw createError;

        if (!newConvo) {
          throw new Error("Failed to create conversation");
        }

        conversationId = newConvo.id;

        // Add the new conversation to the list
        const otherParticipant =
          newConvo.participant1.id === userData.userId
            ? newConvo.participant2
            : newConvo.participant1;

        const newConversation = {
          id: conversationId,
          name: otherParticipant.full_name,
          avatar: otherParticipant.profile_photo_url,
          message: "No messages yet",
          time: new Date().toISOString(),
          isOnline: false,
          status: "Offline",
        };

        setConversations((prev) => [newConversation, ...prev]);
      }

      // Update UI state
      setActiveConversationId(conversationId);
      setIsNewChatOpen(false);
      setSearchQuery("");

      // Fetch updated conversations list
      await fetchConversations();
    } catch (error) {
      console.error("Error starting conversation:", error);
      alert("Failed to start conversation. Please try again.");
    } finally {
      setLoadingContacts(false);
    }
  };

  // Loading states
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Please log in to access chat.</p>
      </div>
    );
  }

  // contacts filter
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearHistory = async () => {
    if (!activeConversationId) return;

    try {
      // Delete all messages from this conversation
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("conversation_id", activeConversationId);

      if (error) throw error;

      // Clear messages from state
      setMessages([]);

      // Update conversation in state
      setConversations((prev) =>
        prev.map((convo) =>
          convo.id === activeConversationId
            ? {
                ...convo,
                message: "No messages yet",
                time: new Date().toISOString(),
              }
            : convo
        )
      );
    } catch (error) {
      console.error("Error clearing history:", error);
      alert("Failed to clear chat history");
    }
  };

  const handleDeleteConversation = async () => {
    if (!activeConversationId) return;

    try {
      // Delete the conversation (cascade will handle messages)
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", activeConversationId);

      if (error) throw error;

      // Remove conversation from state
      setConversations((prev) =>
        prev.filter((convo) => convo.id !== activeConversationId)
      );

      // Clear active conversation
      setActiveConversationId(null);
      setMessages([]);
    } catch (error) {
      console.error("Error deleting conversation:", error);
      alert("Failed to delete conversation");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar userType={userType} />

      <div className="ml-64">
        {/* Middle Column - Conversations List */}
        <div className="w-96 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Messages</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsNewChatOpen(true)}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            {loadingConversations ? (
              <div className="p-4 text-center">
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                <p className="text-sm text-gray-500 mt-2">
                  Loading conversations...
                </p>
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No conversations yet</p>
                <Button
                  onClick={() => setIsNewChatOpen(true)}
                  variant="link"
                  className="mt-2"
                >
                  Start a new conversation
                </Button>
              </div>
            ) : (
              <div className="p-2">
                {conversations.map((convo) => (
                  <div
                    key={convo.id}
                    onClick={() => setActiveConversationId(convo.id)}
                    className={`flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer ${
                      activeConversationId === convo.id ? "bg-gray-100" : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={convo.avatar || mdp} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {convo.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm truncate">
                          {convo.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(convo.time), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {convo.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Right Column - Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {activeConversationId ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={
                      conversations.find((c) => c.id === activeConversationId)
                        ?.avatar || mdp
                    }
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {conversations
                      .find((c) => c.id === activeConversationId)
                      ?.name.substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {
                      conversations.find((c) => c.id === activeConversationId)
                        ?.name
                    }
                  </h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap "
                    >
                      <i className="fas fa-ellipsis-v text-[1.4rem] text-blue-800"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleClearHistory}>
                      <div className="flex items-center">
                        <i className="fas fa-eraser mr-2" />
                        Clear History
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDeleteConversation}
                      className="text-red-600"
                    >
                      <div className="flex items-center">
                        <i className="fas fa-trash-alt mr-2" />
                        Delete chat
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.isSelf ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.isSelf
                            ? "bg-[#269EB2] text-white rounded-tr-none"
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                        }`}
                      >
                        {!msg.isSelf && (
                          <p className="text-md font-medium mb-1">
                            {msg.sender}
                          </p>
                        )}
                        <p className="mt-1.5 text-lg font-medium">
                          {msg.message}
                        </p>

                        <div
                          className={`text-xs mt-1 ${
                            msg.isSelf ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={sendingMessage}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !inputMessage.trim()}
                  className="bg-[#269EB2] hover:bg-[#269EB2]/90"
                >
                  {sendingMessage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <i className="fas fa-paper-plane" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>Select a conversation or start a new one</p>
            <Button
              onClick={() => setIsNewChatOpen(true)}
              variant="link"
              className="mt-2"
            >
              Start a new conversation
            </Button>
          </div>
        )}
      </div>

      {/* New Chat Dialog */}
      <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
          </DialogHeader>

          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[300px]">
            {loadingContacts ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchQuery ? (
                  <p>No contacts found matching "{searchQuery}"</p>
                ) : (
                  <p>No contacts available</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <Avatar className="h-10 w-10 mr-3 shrink-0">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {contact.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {contact.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {contact.subtitle}
                        </p>
                        <p className="text-xs text-[#269EB2]">{contact.role}</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleStartConversation(contact.id)}
                      size="sm"
                      className="bg-[#269EB2] hover:bg-[#269EB2]/90 ml-4 shrink-0"
                      disabled={loadingContacts}
                    >
                      {loadingContacts ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Message"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
