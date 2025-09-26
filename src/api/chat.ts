import { getStore, setStore, generateId, Chat, ChatMessage } from '@/lib/store';
import { UserRole } from '@/lib/auth';

export function getChatHistory(userEmail: string): Chat[] {
  return getStore().chats
    .filter(c => c.userEmail === userEmail)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function createChat(userEmail: string, userRole: UserRole): Chat {
  const store = getStore();
  const newChat: Chat = {
    id: generateId(),
    userEmail,
    userRole,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  store.chats.push(newChat);
  setStore(store);
  return newChat;
}

export function addMessageToChat(chatId: string, message: ChatMessage): void {
  const store = getStore();
  const chat = store.chats.find(c => c.id === chatId);
  
  if (chat) {
    chat.messages.push(message);
    chat.updatedAt = new Date().toISOString();
    setStore(store);
  }
}

export function generateMockResponse(userMessage: string, userRole: UserRole): string {
  const responses = {
    student: {
      homework: [
        "I'd be happy to help with your homework! Can you tell me which subject or specific topic you're working on?",
        "For homework assistance, I recommend breaking down the problem into smaller steps. What's the main challenge you're facing?",
        "Let's work through this together. Start by identifying the key concepts in your assignment."
      ],
      assignment: [
        "Great question about your assignment! Make sure to review the rubric and requirements carefully.",
        "For this type of assignment, I suggest creating an outline first. What's the main topic you're covering?",
        "Remember to cite your sources properly and follow the formatting guidelines provided by your instructor."
      ],
      general: [
        "Hello! I'm your Homework Assistant. I can help you with study strategies, assignment planning, and understanding concepts.",
        "How can I assist you with your studies today? I'm here to help with homework, projects, and learning strategies.",
        "As your study companion, I can help you organize your work, understand difficult concepts, and develop effective study habits."
      ]
    },
    faculty: {
      teaching: [
        "As your Teaching Assistant, I can help you with lesson planning, quiz creation, and student engagement strategies.",
        "Would you like suggestions for interactive activities or assessment methods for your next class?",
        "I can assist with creating engaging content, managing classroom dynamics, or developing evaluation criteria."
      ],
      grading: [
        "For efficient grading, consider using rubrics with clear criteria. This ensures consistency and provides better feedback to students.",
        "When reviewing student work, focus on both content understanding and skill development. Provide constructive feedback.",
        "Consider using a mix of formative and summative assessments to track student progress effectively."
      ],
      general: [
        "Hello! I'm your Teaching Assistant. I can help with curriculum planning, student assessment, and classroom management.",
        "How can I support your teaching today? I'm here to help with lesson plans, student evaluations, and educational strategies.",
        "As your academic partner, I can assist with course design, student engagement techniques, and professional development."
      ]
    },
    hod: {
      department: [
        "As your Department Assistant, I can help with faculty coordination, curriculum oversight, and departmental analytics.",
        "Would you like to review departmental performance metrics or discuss faculty development initiatives?",
        "I can assist with resource allocation, schedule optimization, and interdisciplinary collaboration planning."
      ],
      analytics: [
        "Based on current data, your department shows strong performance in student engagement and assignment completion rates.",
        "Consider reviewing the feedback trends to identify areas for curriculum enhancement and faculty support.",
        "The analytics suggest opportunities for improving cross-course coordination and resource utilization."
      ],
      general: [
        "Hello! I'm your Department Assistant. I can help with oversight, coordination, and strategic planning for your department.",
        "How can I support your departmental leadership today? I'm here for analytics, planning, and faculty coordination.",
        "As your administrative partner, I can assist with performance monitoring, resource management, and strategic initiatives."
      ]
    },
    dean: {
      institution: [
        "As your Institution Assistant, I can help with cross-departmental analysis, strategic planning, and institutional metrics.",
        "Would you like to review institution-wide performance data or discuss strategic initiatives across departments?",
        "I can assist with policy development, resource allocation, and institutional quality assurance."
      ],
      analytics: [
        "Institution-wide metrics show positive trends in student satisfaction and faculty engagement across departments.",
        "Consider focusing on interdisciplinary programs and resource sharing to enhance institutional effectiveness.",
        "The data suggests opportunities for strengthening collaboration between departments and improving outcomes."
      ],
      general: [
        "Hello! I'm your Institution Assistant. I can help with strategic oversight, policy development, and institutional analytics.",
        "How can I support your institutional leadership today? I'm here for analytics, planning, and strategic coordination.",
        "As your executive partner, I can assist with institutional performance, policy implementation, and strategic vision."
      ]
    }
  };

  const roleResponses = responses[userRole];
  let category = 'general';
  
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes('homework') || lowerMessage.includes('study')) {
    category = userRole === 'student' ? 'homework' : 'general';
  } else if (lowerMessage.includes('assignment') || lowerMessage.includes('project')) {
    category = userRole === 'student' ? 'assignment' : 'general';
  } else if (lowerMessage.includes('teach') || lowerMessage.includes('class') || lowerMessage.includes('student')) {
    category = userRole === 'faculty' ? 'teaching' : userRole === 'hod' ? 'department' : userRole === 'dean' ? 'institution' : 'general';
  } else if (lowerMessage.includes('grade') || lowerMessage.includes('assessment')) {
    category = userRole === 'faculty' ? 'grading' : 'general';
  } else if (lowerMessage.includes('department') || lowerMessage.includes('faculty')) {
    category = userRole === 'hod' ? 'department' : userRole === 'dean' ? 'institution' : 'general';
  } else if (lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('report')) {
    category = (userRole === 'hod' || userRole === 'dean') ? 'analytics' : 'general';
  }

  const categoryResponses = roleResponses[category as keyof typeof roleResponses] || roleResponses.general;
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}