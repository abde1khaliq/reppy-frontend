"use client";

import { signIn } from "next-auth/react";

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  Flex,
  Link,
  Spinner,
  Field,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { LuLock, LuUser } from "react-icons/lu";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const login_schema = z.object({
  email: z.email(),
  password: z.string(),
});

type LoginForm = z.infer<typeof login_schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(login_schema),
    mode: "onChange",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });

    setIsSubmitting(false);
  };

  return (
    <Box as={"form"} onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={5} align="stretch">
        {/* Header */}
        <VStack gap={1} textAlign="center">
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            color={{ base: "black", _dark: "white" }}
          >
            Welcome Back
          </Heading>
          <Text fontSize="sm" color={{ base: "gray.600", _dark: "gray.400" }}>
            Continue your fitness journey
          </Text>
        </VStack>

        <VStack gap={2.5}>
          <Button
            type="button"
            w="100%"
            size="md"
            bg={{
              base: "rgba(0, 0, 0, 0.05)",
              _dark: "rgba(255, 255, 255, 0.05)",
            }}
            color={{ base: "black", _dark: "white" }}
            border="1px solid"
            borderColor={{
              base: "rgba(0, 0, 0, 0.1)",
              _dark: "rgba(255, 255, 255, 0.1)",
            }}
            _hover={{
              base: { bg: "rgba(0, 0, 0, 0.1)" },
              _dark: { bg: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <Flex align="center" gap={2}>
              <FaGoogle />
              <Text fontSize="sm">Continue with Google</Text>
            </Flex>
          </Button>
          <Button
            type="button"
            w="100%"
            size="md"
            bg={{
              base: "rgba(0, 0, 0, 0.05)",
              _dark: "rgba(255, 255, 255, 0.05)",
            }}
            color={{ base: "black", _dark: "white" }}
            border="1px solid"
            borderColor={{
              base: "rgba(0, 0, 0, 0.1)",
              _dark: "rgba(255, 255, 255, 0.1)",
            }}
            _hover={{
              base: { bg: "rgba(0, 0, 0, 0.1)" },
              _dark: { bg: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <Flex align="center" gap={2}>
              <FaApple />
              <Text fontSize="sm">Continue with Apple</Text>
            </Flex>
          </Button>
        </VStack>

        {/* Divider */}
        <Flex align="center" gap={3}>
          <Box
            flex={1}
            h="1px"
            bg={{
              base: "rgba(0, 0, 0, 0.1)",
              _dark: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Text
            fontFamily="var(--font-poppins)"
            fontSize="xs"
            color={{ base: "gray.500", _dark: "gray.500" }}
            whiteSpace="nowrap"
          >
            or
          </Text>
          <Box
            flex={1}
            h="1px"
            bg={{
              base: "rgba(0, 0, 0, 0.1)",
              _dark: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </Flex>

        {/* Form */}
        <VStack gap={3.5} align={"stretch"}>
          <VStack align="stretch" gap={2}>
            <Field.Root required invalid={Boolean(errors.email)}>
              <Field.Label
                fontSize="xs"
                color={{ base: "gray.700", _dark: "gray.300" }}
              >
                Email Address <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<LuUser />}>
                <Input
                  _placeholder={{
                    fontSize: "15px",
                    color: "gray.500",
                  }}
                  variant={"outline"}
                  type="text"
                  {...register("email")}
                  placeholder="abdelkhaliq@gmail.com"
                  size="lg"
                />
              </InputGroup>
              {errors.email && (
                <Field.ErrorText>{errors.email.message}</Field.ErrorText>
              )}
            </Field.Root>
          </VStack>

          <VStack align="stretch" gap={2}>
            <Field.Root required invalid={Boolean(errors.password)}>
              <Field.Label
                fontSize="xs"
                color={{ base: "gray.700", _dark: "gray.300" }}
              >
                Password <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup startElement={<LuLock />}>
                <Input
                  _placeholder={{
                    fontSize: "15px",
                    color: "gray.500",
                  }}
                  variant={"outline"}
                  type="password"
                  {...register("password")}
                  placeholder="123456789"
                  size="lg"
                />
              </InputGroup>
              {errors.password && (
                <Field.ErrorText>{errors.password.message}</Field.ErrorText>
              )}
            </Field.Root>
          </VStack>

          <Flex w="100%" justify="flex-end">
            <Link
              fontSize="xs"
              color="var(--reppy-green)"
              _hover={{ textDecoration: "underline" }}
            >
              Forgot password?
            </Link>
          </Flex>

          <Button
            type="submit"
            w="100%"
            size="md"
            bg="var(--reppy-green)"
            color="black"
            fontWeight="bold"
            disabled={isSubmitting}
            _hover={{ bg: "var(--reppy-green)", opacity: 0.9 }}
          >
            {isSubmitting ? <Spinner size="sm" mr={2} /> : null}
            {isSubmitting ? "" : "Login"}
          </Button>
        </VStack>

        <Text
          fontSize="sm"
          color={{ base: "gray.600", _dark: "gray.400" }}
          textAlign="center"
        >
          Don't have an account?{" "}
          <Link color="var(--reppy-green)" href="/register">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
