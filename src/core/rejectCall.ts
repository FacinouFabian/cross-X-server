const rejectCall = async (_, socket) => {
  socket.on('reject-call', (data) => {
    socket.to(data.from).emit('call-rejected', {
      socket: socket.id,
    })
  })
}
export default rejectCall
