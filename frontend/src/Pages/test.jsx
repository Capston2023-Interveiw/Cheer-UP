import { useState } from 'react'; // Importing useState hook from React to manage state
import axios from 'axios'; // Importing Axios library to make HTTP requests

const LoginPage = () => {
  const [accountId, setAccountId] = useState(''); // Creating a state variable to hold the entered accountId
  const [password, setPassword] = useState(''); // Creating a state variable to hold the entered password
  const [errorMessage, setErrorMessage] = useState(''); // Creating a state variable to hold the error message

  const handleAccountIdChange = (e) => { // Function to update the state when the accountId input field changes
    setAccountId(e.target.value);
  };

  const handlePasswordChange = (e) => { // Function to update the state when the password input field changes
    setPassword(e.target.value);
  };

  const handleLogin = () => { // Function to handle the login button click event
    if (!accountId || !password) { // If either accountId or password is empty, set the error message
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    axios.post('/api/v1/members/login', { // Send a POST request to the server with the entered accountId and password
      accountId,
      password,
    })
      .then((response) => { // If the request is successful, save the access token in the local storage
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        // Redirect to the main page or do any other necessary actions
      })
      .catch((error) => { // If the request fails, set the error message based on the status code of the response
        if (error.response.status === 401) {
          setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
        } else {
          setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <div>
          <label htmlFor="account-id">아이디</label>
          <input type="text" id="account-id" value={accountId} onChange={handleAccountIdChange} /> // Input field for accountId
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} /> // Input field for password
        </div>
        {errorMessage && <div>{errorMessage}</div>} // Display the error message if it exists
        <button type="button" onClick={handleLogin}>로그인</button> // Button to trigger the login function
      </form>
    </div>
  );
};

export default LoginPage; // Exporting the LoginPage component for use in other parts of the application
