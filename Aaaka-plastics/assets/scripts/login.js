async function login2(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const username = usernameInput.value;
  const password = passwordInput.value;
  const data = {
    username: username,
    password: password,
  };
  // const data = {
  //         username: "SuperUser",
  //         password: "1234",
  //       };
  console.log(data);
  const url = 'http://localhost:5500/login';
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     origin: '*',
  //   },
  //   body:JSON.stringify(data),
  // });
  const response = await axios.post(url, data);
  // if (response.data.message === 'true') {
  //   console.log('Login was successful.');
  if (response[0] == 'true') {
    console.log('Login was successful.');
    // history.replaceState({}, '', 'http://127.0.0.1:5500/Aaaka-plastics/index.tml');
    // Redirect to index.html after a successful login
    // window.location.href = '../index.html'; // Replace 'index.html' with your desired page
    
    
  } else {  
    // console.log('Login was not successful.');
    
    console.log(response.data);
    console.log(response);
    window.location.href = 'http://127.0.0.1:5500/Aaaka-plastics/index.html';
    } 
  }