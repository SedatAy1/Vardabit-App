import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset (Sıfırlama) - Tarayıcıların varsayılan stillerini sıfırlamak için */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth; /* Smooth scrolling */
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif; /* Varsayılan font ailesi */
    -webkit-font-smoothing: antialiased; /* Font yumuşatma */
    -moz-osx-font-smoothing: grayscale;  /* Font yumuşatma */
    background-color: #f5f5f5; /* Varsayılan arka plan rengi */
    color: #333; /* Varsayılan yazı rengi */
    line-height: 1.6; /* Satır yüksekliği */
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600; /* Başlıklar için varsayılan font kalınlığı */
    margin-bottom: 1rem; /* Başlıkların altındaki boşluk */
    line-height: 1.2;
  }

  a {
    text-decoration: none; /* Linklerin altı çizili olmasın */
    color: #2196f3; /* Link rengi (örnek) */
      &:hover{
        text-decoration: underline;
    }
  }


  ul, ol {
    list-style: none; /* Liste işaretlerini kaldır */
  }

  img {
    max-width: 100%; /* Resimler, bulundukları kapsayıcıyı aşmasın */
    height: auto; /* Yükseklik otomatik ayarlansın */
    display: block; /* Blok element gibi davran */
  }

  button {
    cursor: pointer; /* Fare imleci, butonların üzerine gelince değişsin */
    border: none; /* Butonların kenarlığı olmasın */
    background-color: transparent;
    font-family: inherit; /* Font ailesini body'den miras alsın */
     &:disabled {
      cursor: not-allowed;
      opacity: 0.6; /* Disable olmuş butonların opaklığı */
    }
  }

    /* İhtiyacınız olan diğer global stiller buraya */
    /* Örneğin, belirli bir class için genel stil tanımlayabilirsiniz: */
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
          border-color: #2196f3; /* Odaklanıldığında kenarlık rengi */
          box-shadow: 0 0 5px rgba(33, 150, 243, 0.5); /* Hafif bir gölge */
        }
    }

    /* Checkbox ve radio butonları için özel stiller (isteğe bağlı) */
    input[type="checkbox"],
    input[type="radio"] {
        accent-color: #2196f3; /* Seçili olduğunda renk */
    }
`;

export default GlobalStyles;