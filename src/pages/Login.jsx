import {
  VStack,
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  Link,
  Heading,
  Flex,
  useToast,
  Button
} from "@chakra-ui/react";


import { BsGithub } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginAPI } from "../redux/Auth/auth.action"
import { useEffect } from "react";
import { useState } from "react";

const Login = () => {
const toast = useToast()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    document.title = 'Login |  Inertia Tracker';
  })

  const handleSubmit = (e) => {
    e.preventDefault();
        setLoading(true);
        dispatch(loginAPI({email, password})).then((res)=>{
            setEmail("")
            setPassword("")
            console.log(res);

            if (res.status) {
              setLoading(false);
              navigate("/");
              return toast(
                {
                  title: 'Login Succesfull',
                  description: "Welcome to  Inertia Tracker",
                  status: 'success',
                  duration: 3000,
                  position: "top",
                  isClosable: true,
                }
              )
            } else {
              setLoading(false);
              return toast({
                title: "Error occured",
                description: `${res.message}`,
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
              });
            }
  }).catch((e) => {
    setLoading(false);
    return toast(
      {
        title: "Error occured",
        description: `${e.message}`,
        status: 'error',
        duration: 3000,
        position: "top",
        isClosable: true,
      }
    )
  })
}

  return (
    <>
      <Navbar />
      <VStack p="150px 25px 40px 25px" m="auto" w="400px">
        <Heading mb="24px" as="h1" fontSize="36px" color="#475056">
          Log in to DeskTime
        </Heading>
        <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel color="blackAlpha.800" fontSize="14px">
            Email
          </FormLabel>
          <Input
            onChange={({target}) => setEmail(target.value)}
            value={email}
            mb="15px"
            type="email"
            placeholder="Type in your email address"
            isRequired
          />
          <FormLabel color="blackAlpha.800" fontSize="14px">
            Password
          </FormLabel>
          <Input
            onChange={({target}) => setPassword(target.value)}
            value={password}
            mb="15px"
            type="password"
            placeholder="Type in your password"
            isRequired
          />
          <Button
            isLoading={loading}
            w="100%"
            mb="15px"
            fontSize="14px"
            color="white"
            type="submit"
            cursor="pointer"
            bg="#4ea819"
            fontWeight="500"
            _hover={{ bg: "#327c04" }}
          >LOGIN</Button>
        </FormControl>
        </form>
        <Link
          textDecoration="underline"
          fontWeight="bold"
          color="blackAlpha.800"
        >
          I forgot my password
        </Link>
        <Text mb="16px !important">
          Don’t have an account yet?{" "}
          <Link
            textDecoration="underline"
            fontWeight="bold"
            color="blackAlpha.800"
          >
            Sign up here!
          </Link>{" "}
        </Text>
        <Box border="1px solid #ebecec" p="24px">
          <Text mb="24px" fontWeight="bold" color="blackAlpha.800">
            Or connect with
          </Text>
          <Flex gap="10px">
            <Link
              
              className="authlinks"
              bgColor="#1877f2"
              backgroundImage='url("https://desktime.com/assets/img/bs4/icons/social/logo-facebook-white.svg")'
            ></Link>
            <Link 
              className="authlinks"
              bgColor="#1da1f2"
              backgroundImage='url("https://desktime.com/assets/img/bs4/icons/social/logo-twitter-white.svg")'
            ></Link>
            <Link 
              className="authlinks"
              bgColor="#f5f5f6"
              border="1px solid #d6d8d9"
              backgroundImage='url("https://desktime.com/assets/img/bs4/icons/social/logo-google-color.svg")'
            ></Link>
            <Link className="authlinks" bgColor="black">
              <Flex h="100%" justifyContent="center" alignItems="center">
                <BsGithub className="apple" color="white" />
              </Flex>
            </Link>
          </Flex>
        </Box>
      </VStack>
      <Footer />
    </>
  );
};

export default Login;