import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  a {
    text-decoration: none;
    color: #2196f3;
      &:hover{
        text-decoration: underline;
    }
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-family: inherit;
     &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    input[type="search"] {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
        &:focus {
          outline: none;
          border-color: #2196f3;
          box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
        }
    }

    input[type="checkbox"],
    input[type="radio"] {
        accent-color: #2196f3;
    }
`;

export default GlobalStyles;