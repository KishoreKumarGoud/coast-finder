import { useState } from 'react'
import { MessageCircle, X, ChevronRight, Bot, ArrowLeft, Sparkles } from 'lucide-react'
import { chatFAQs } from '@/data/chatFAQs'

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [showAnimation, setShowAnimation] = useState(false)

    const handleQuestionClick = (faq) => {
        setSelectedQuestion(faq)
        setShowAnimation(true)
        setTimeout(() => setShowAnimation(false), 300)
    }

    const handleBack = () => {
        setSelectedQuestion(null)
    }

    const handleClose = () => {
        setIsOpen(false)
        setSelectedQuestion(null)
    }

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group ${isOpen
                        ? 'bg-gray-600 hover:bg-gray-700 rotate-0'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-110'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <>
                        <MessageCircle className="w-6 h-6 text-white" />
                        {/* Pulse animation */}
                        <span className="absolute w-full h-full rounded-full bg-cyan-400 animate-ping opacity-30"></span>
                    </>
                )}
            </button>

            {/* Chat Widget Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4">
                        <div className="flex items-center gap-3">
                            {selectedQuestion ? (
                                <button
                                    onClick={handleBack}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </button>
                            ) : (
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-white font-semibold">Coast Finder Assistant</h3>
                                <p className="text-white/80 text-xs">Ask me anything about beaches!</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="h-80 overflow-y-auto">
                        {!selectedQuestion ? (
                            /* Question List */
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-4 h-4 text-cyan-500" />
                                    <p className="text-sm text-gray-600 font-medium">Frequently Asked Questions</p>
                                </div>
                                <div className="space-y-2">
                                    {chatFAQs.map((faq) => (
                                        <button
                                            key={faq.id}
                                            onClick={() => handleQuestionClick(faq)}
                                            className="w-full text-left p-3 bg-gray-50 hover:bg-cyan-50 rounded-xl transition-all duration-200 group flex items-center justify-between"
                                        >
                                            <span className="text-sm text-gray-700 group-hover:text-cyan-700 pr-2 line-clamp-2">
                                                {faq.question}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 flex-shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Answer View */
                            <div className={`p-4 ${showAnimation ? 'animate-fadeIn' : ''}`}>
                                {/* User Question Bubble */}
                                <div className="flex justify-end mb-4">
                                    <div className="bg-cyan-500 text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-[85%]">
                                        <p className="text-sm">{selectedQuestion.question}</p>
                                    </div>
                                </div>

                                {/* Bot Answer Bubble */}
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%]">
                                        <p className="text-sm text-gray-700 leading-relaxed">{selectedQuestion.answer}</p>
                                    </div>
                                </div>

                                {/* Quick Action */}
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={handleBack}
                                        className="text-cyan-600 text-sm font-medium hover:underline"
                                    >
                                        Ask another question →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 p-3 bg-gray-50">
                        <p className="text-xs text-center text-gray-400">
                            Powered by Coast Finder
                        </p>
                    </div>
                </div>
            )}

            {/* Styles for animations */}
            <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </>
    )
}
