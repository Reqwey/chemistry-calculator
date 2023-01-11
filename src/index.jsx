import React, { useState } from "react";
import * as ReactDOM from "react-dom/client";
import { CssVarsProvider } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Divider from "@mui/joy/Divider";
import ChemistryCalc from './calc';
import Footer from "./footer";
import '@fontsource/public-sans';

export default function ReqApp() {
  const [inputedValue, updateInputedValue] = useState('');
  const [formula, updateFormula] = useState('CaCO3');

  function handleChange(e) {
    updateInputedValue(e.target.value);
  }

  function handlePost() {
    updateFormula(inputedValue);
  }

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 600,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h2" component="h1" align="center">
              <b>分子量计算器</b>
            </Typography>
            <Typography level="body2" align="center">输入化学方程式，我们帮你计算它的分子量.</Typography>
          </div>
          <Input
            // html input attribute
            placeholder="CaCO3"
            // pass down to FormLabel as children
            onChange={
              handleChange.bind(this)
            }
          />
          <Button
            sx={{ mt: 1 /* margin top */ }}
            onClick={handlePost}
          >开始计算</Button>
          <Divider />
          <ChemistryCalc formula={formula} />
        </Sheet>
        <Footer />
      </main>
    </CssVarsProvider>
  );
}

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <ReqApp />
  </React.StrictMode>
);
