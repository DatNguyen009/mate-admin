import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
     :root {
     --gray-100: #f4f5f6;
     --white: #ffffff;
     --primary: #2490ef;
     --bs-blue: #0e83eb;
     --del-red-hover: #d82323;
     --del-red: #ec645e;
     --black: #1f272e;
    


     --padding-xs: 5px;
     --padding-sm: 10px;
     --padding-md: 15px;
     --padding-lg: 20px;
     --padding-xl: 30px;
     --padding-2xl: 40px;

     --margin-xs: 5px;
     --margin-sm: 8px;
     --margin-md: 15px;
     --margin-lg: 20px;
     --margin-xl: 30px;
     --margin-2xl: 40px;



     --border-radius: 6px;

     --text-xs: 11px;
     --text-sm: 12px;
     --text-md: 13px;
     --text-base: 14px;
     --text-lg: 16px;
     --text-xl: 18px;
     --text-2xl: 20px;
     --text-3xl: 22px;

     --shadow-xs: rgba(0,0,0,0.05) 0px 0.5px 0px 0px,rgba(0,0,0,0.08) 0px 0px 0px 1px,rgba(0,0,0,0.05) 0px 2px 4px 0px;
     --shadow-sm: 0px 1px 2px rgba(25,39,52,0.05),0px 0px 4px rgba(25,39,52,0.1);
     --shadow-base: 0px 4px 8px rgba(25,39,52,0.06),0px 0px 4px rgba(25,39,52,0.12);
     --shadow-md: 0px 8px 14px rgba(25,39,52,0.08),0px 2px 6px rgba(25,39,52,0.04);
     --shadow-lg: 0px 18px 22px rgba(25,39,52,0.1),0px 1px 10px rgba(0,0,0,0.06),0px 0.5px 5px rgba(25,39,52,0.04);
     --btn-shadow: var(--shadow-xs);
     }
`;
