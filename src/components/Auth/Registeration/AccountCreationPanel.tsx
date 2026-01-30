"use client";

import {
  Box,
  Text,
  VStack,
  Button,
  Input,
  Flex,
  Link,
  HStack,
  Progress,
  Heading,
  Field,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import slideVariants from "@/app/lib/slide_variants";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuLock, LuMail, LuUser } from "react-icons/lu";
import account_creation_schema from "@/app/lib/AccountCreationSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

type Step = 1 | 2 | 3 | 4;

type AccountFormData = z.infer<typeof account_creation_schema>;

const AccountCreationPanel = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const router = useRouter();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(account_creation_schema),
    mode: "onChange",
  });

  const onSubmit = async (data: AccountFormData) => {
    setIsSubmitting(true);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      setIsSubmitting(false);
      router.push("/dashboard");
    }
  };

  const handleNext = async () => {
    const fields =
      currentStep === 2 ? ["first_name", "last_name"] : ["username", "email"];

    const isValid = await trigger(fields as any);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  return (
    <VStack gap={6} align="stretch">
      <VStack gap={2} align="stretch">
        <Flex justify="space-between" align="center">
          <Text fontSize="xs" color="gray.500" fontFamily="var(--font-poppins)">
            Step {currentStep} of {totalSteps}
          </Text>
          <Text fontSize="xs" color="var(--reppy-green)">
            {Math.round(progress)}% Complete
          </Text>
        </Flex>
        <Progress.Root animated striped value={progress} size="sm">
          <Progress.Track>
            <Progress.Range bg="var(--reppy-green)" />
          </Progress.Track>
        </Progress.Root>
      </VStack>

      <Box position="relative" minH="400px" overflow="hidden">
        <AnimatePresence mode="wait" custom={1}>
          {currentStep === 1 && (
            <MotionBox
              key="step1"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              position="absolute"
              w="100%"
            >
              <VStack gap={6} align="stretch">
                <VStack gap={2} textAlign="center">
                  <Heading
                    fontSize="2xl"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Welcome to Reppy
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    How would you like to get started?
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
                <Button
                  bg="var(--reppy-green)"
                  fontWeight={"bold"}
                  onClick={() => setCurrentStep(2)}
                >
                  Create Account with Reppy
                </Button>
              </VStack>
            </MotionBox>
          )}

          {currentStep === 2 && (
            <MotionBox
              key="step2"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              position="absolute"
              w="100%"
            >
              <VStack gap={6} align="stretch">
                <VStack gap={2} textAlign="center">
                  <User size={32} color="var(--reppy-green)" />
                  <Heading
                    fontSize="2xl"
                    color={{ base: "black", _dark: "white" }}
                  >
                    What's your name?
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    We'd love to know what to call you
                  </Text>
                </VStack>

                <VStack gap={4} align="stretch">
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <VStack align="stretch" gap={2}>
                      <Field.Root required invalid={Boolean(errors.first_name)}>
                        <Field.Label
                          fontSize="xs"
                          color={{ base: "gray.700", _dark: "gray.300" }}
                        >
                          First Name <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup startElement={<LuUser />}>
                          <Input
                            _placeholder={{
                              fontSize: "15px",
                              color: "gray.500",
                            }}
                            variant={"outline"}
                            type="text"
                            {...register("first_name")}
                            placeholder="Ahmed"
                            size="lg"
                          />
                        </InputGroup>
                        {errors.first_name && (
                          <Field.ErrorText>
                            {errors.first_name.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </VStack>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <VStack align="stretch" gap={2}>
                      <Field.Root required invalid={Boolean(errors.last_name)}>
                        <Field.Label
                          fontSize="xs"
                          color={{ base: "gray.700", _dark: "gray.300" }}
                        >
                          Last Name <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup startElement={<LuUser />}>
                          <Input
                            _placeholder={{
                              fontSize: "15px",
                              color: "gray.500",
                            }}
                            variant={"outline"}
                            type="text"
                            {...register("last_name")}
                            placeholder="Mohamed"
                            size="lg"
                          />
                        </InputGroup>
                        {errors.last_name && (
                          <Field.ErrorText>
                            {errors.last_name.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </VStack>
                  </MotionBox>
                </VStack>
              </VStack>
            </MotionBox>
          )}

          {currentStep === 3 && (
            <MotionBox
              key="step3"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              position="absolute"
              w="100%"
            >
              <VStack gap={6} align="stretch">
                <VStack gap={2} textAlign="center">
                  <Mail size={32} color="var(--reppy-green)" />
                  <Heading
                    fontSize="2xl"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Your Identity
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Choose your username and email
                  </Text>
                </VStack>

                <VStack gap={4} align="stretch">
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <VStack align="stretch" gap={2}>
                      <Field.Root required invalid={Boolean(errors.username)}>
                        <Field.Label
                          fontSize="xs"
                          color={{ base: "gray.700", _dark: "gray.300" }}
                        >
                          Username <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup startElement={<LuUser />}>
                          <Input
                            _placeholder={{
                              fontSize: "15px",
                              color: "gray.500",
                            }}
                            variant={"outline"}
                            type="text"
                            {...register("username")}
                            placeholder="Abdelkhaliq"
                            size="lg"
                          />
                        </InputGroup>
                        <Field.HelperText>
                          Just to get to know you.
                        </Field.HelperText>
                        {errors.username && (
                          <Field.ErrorText>
                            {errors.username.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </VStack>
                  </MotionBox>

                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <VStack align="stretch" gap={2}>
                      <Field.Root required invalid={Boolean(errors.email)}>
                        <Field.Label
                          fontSize="xs"
                          color={{ base: "gray.700", _dark: "gray.300" }}
                        >
                          Email Address <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup startElement={<LuMail />}>
                          <Input
                            _placeholder={{
                              fontSize: "15px",
                              color: "gray.500",
                            }}
                            variant={"outline"}
                            type="text"
                            {...register("email")}
                            placeholder="abdelkhaliq@example.com"
                            size="lg"
                          />
                        </InputGroup>
                        <Field.HelperText>
                          Important for logging in later.
                        </Field.HelperText>
                        {errors.email && (
                          <Field.ErrorText>
                            {errors.email.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </VStack>
                  </MotionBox>
                </VStack>
              </VStack>
            </MotionBox>
          )}

          {currentStep === 4 && (
            <MotionBox
              key="step4"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              position="absolute"
              w="100%"
            >
              <VStack gap={6} align="stretch">
                <VStack gap={2} textAlign="center">
                  <Lock size={32} color="var(--reppy-green)" />
                  <Heading
                    fontSize="2xl"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Secure Your Account
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Create a strong password
                  </Text>
                </VStack>

                <VStack gap={4} align="stretch">
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <VStack align="stretch" gap={2}>
                      <Field.Root invalid={Boolean(errors.password)}>
                        <Field.Label
                          fontSize="xs"
                          color={{ base: "gray.700", _dark: "gray.300" }}
                        >
                          Password
                        </Field.Label>
                        <InputGroup startElement={<LuLock />}>
                          <Input
                            _placeholder={{
                              fontSize: "15px",
                              color: "gray.500",
                            }}
                            variant={"outline"}
                            type="text"
                            {...register("password")}
                            placeholder="This is a strong password"
                            size="lg"
                          />
                        </InputGroup>
                        <Field.HelperText>
                          We'll never ask for your password later.
                        </Field.HelperText>
                        {errors.password && (
                          <Field.ErrorText>
                            {errors.password.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </VStack>
                  </MotionBox>
                </VStack>
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      {currentStep > 1 && (
        <HStack gap={3}>
          <MotionButton
            onClick={handleBack}
            variant="outline"
            flex={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            disabled={isSubmitting}
          >
            <ChevronLeft size={18} /> Back
          </MotionButton>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              bg="var(--reppy-green)"
              color="black"
              fontWeight="bold"
              flex={1}
              _hover={{ bg: "var(--reppy-green)", opacity: 0.9 }}
            >
              Continue <ChevronRight size={18} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit(onSubmit)}
              bg="var(--reppy-green)"
              color="black"
              fontWeight="bold"
              flex={1}
              disabled={isSubmitting}
              _hover={{ bg: "var(--reppy-green)", opacity: 0.9 }}
            >
              {isSubmitting ? <Spinner size="sm" mr={2} /> : null}
              {isSubmitting ? "" : "Create My Account"}
            </Button>
          )}
        </HStack>
      )}

      <Text
        fontFamily="var(--font-poppins)"
        fontSize="sm"
        color={{ base: "gray.600", _dark: "gray.400" }}
        textAlign="center"
      >
        Already have an account?{" "}
        <Link color="var(--reppy-green)" fontWeight="semibold" href="/login">
          Login
        </Link>
      </Text>
    </VStack>
  );
};

export default AccountCreationPanel;
