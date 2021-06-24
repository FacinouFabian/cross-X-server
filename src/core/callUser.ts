const callUser = async (_, socket) => {
  socket.on('call-user', (data: any) => {
    console.log('yes')
    socket.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: socket.id,
    })
  })
}
export default callUser
