let total = 0

document.getElementById('signOut').style.display = 'none'

document.getElementById('signUp').addEventListener('click', event => {
  event.preventDefault()

  axios.post('/api/users', {
    username: document.getElementById('username').value
  })
    .then(({ data }) => {
      localStorage.setItem('uid', data._id)
      total = data.totalTime
      document.getElementById('total').textContent = data.totalTime
      document.getElementById('signUpForm').style.display = 'none'
      document.getElementById('signInForm').style.display = 'none'
      document.getElementById('user').textContent = data.username
      document.getElementById('signOut').style.display = 'block'
    })
})

document.getElementById('signIn').addEventListener('click', event => {
  event.preventDefault()

  axios.get(`/api/users/un/${document.getElementById('un').value}`)
    .then(({ data }) => {

      console.log(data)

      localStorage.setItem('uid', data._id)

      document.getElementById('items').innerHTML = ''
      data.items.forEach(item => {
        let itemElem = document.createElement('li')
        itemElem.textContent = `
          Label: ${item.text} \n
          Is Done: ${item.isDone} \n
          Time: ${item.time}
        `
        document.getElementById('items').append(itemElem)
      })

      document.getElementById('total').textContent = data.totalTime
      document.getElementById('signUpForm').style.display = 'none'
      document.getElementById('signInForm').style.display = 'none'
      document.getElementById('user').textContent = data.username
      document.getElementById('signOut').style.display = 'block'
    })
})

document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()
  
  axios.put(`/api/users/${localStorage.getItem('uid')}`, {
    text: document.getElementById('item').value,
    isDone: false,
    time: document.getElementById('time').value
  })
    .then(() => {
      let itemElem = document.createElement('li')
      itemElem.textContent = `
          Label: ${document.getElementById('item').value} \n
          Is Done: false \n
          Time: ${document.getElementById('time').value}
        `

      document.getElementById('total').textContent = total + parseInt(document.getElementById('time').value)
      document.getElementById('items').append(itemElem)
    })
})

document.getElementById('signOut').addEventListener('click', event => {
  localStorage.removeItem('uid')
  document.getElementById('signUpForm').style.display = 'block'
  document.getElementById('signInForm').style.display = 'block'
  document.getElementById('signOut').style.display = 'none'
  document.getElementById('items').innerHTML = ''
  document.getElementById('user').textContent = ''
  document.getElementById('total').textContent = ''

})

if (localStorage.getItem('uid')) {
  axios.get(`/api/users/${localStorage.getItem('uid')}`)
    .then(({ data }) => {
      localStorage.setItem('uid', data._id)

      document.getElementById('items').innerHTML = ''
      data.items.forEach(item => {
        let itemElem = document.createElement('li')
        itemElem.textContent = `
          Label: ${item.text} \n
          Is Done: ${item.isDone} \n
          Time: ${item.time}
        `
        document.getElementById('items').append(itemElem)
      })
      total = data.totalTime
      document.getElementById('user').textContent = data.username
      document.getElementById('total').textContent = data.totalTime
      document.getElementById('signUpForm').style.display = 'none'
      document.getElementById('signInForm').style.display = 'none'
      document.getElementById('signOut').style.display = 'block'
    })
}