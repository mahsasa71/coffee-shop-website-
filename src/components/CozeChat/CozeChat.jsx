import { useEffect } from "react";

export default function CozeChat() {
  useEffect(() => {
    if (!window.CozeWebSDK) return;

    const chatClient = new window.CozeWebSDK.WebChatClient({
      config: {
        bot_id: '7555479203773333516',
      },
      componentProps: {
        title: 'Coze Chat',
      },
      auth: {
        type: 'token',
        token: 'pat_********', 
        onRefreshToken: function () {
          return 'pat_********'; 
        }
      }
    });

    
    return () => {
     
      chatClient.destroy && chatClient.destroy();
    };
  }, []);

  return <div id="coze-chat-container"></div>;
}
