const makeAnswer = async (_, socket) => {
  socket.on('make-answer', (data) => {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer,
    })
  })
}
export default makeAnswer
