"use client";

import {
  Box,
  Text,
  VStack,
  Button,
  Input,
  Link,
  Field,
  InputGroup,
  Progress,
  Heading,
  Flex,
  HStack,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  Camera,
  Check,
} from "lucide-react";
import { FaMars, FaVenus } from "react-icons/fa";
import { LuUser, LuCalendar, LuFileText } from "react-icons/lu";
import profile_creation_schema from "@/app/lib/ProfileCreationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import slideVariants from "@/app/lib/slide_variants";

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

type ProfileFormData = z.infer<typeof profile_creation_schema>;
type Step = 1 | 2 | 3;

const ProfileCreationPanel = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [gender, setGender] = useState<string>("");
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profile_creation_schema),
    mode: "onChange",
  });

  const handleNext = async () => {
    if (currentStep === 2) {
      const isValid = await trigger(["nickname", "bio", "birthday"]);
      if (!isValid) return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    const payload = {
      nickname: data.nickname,
      bio: data.bio,
      birthday: data.birthday,
      gender,
    };
    console.log(payload);

    const response = await fetch("/api/create_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setIsSubmitting(false);
      router.push("/dashboard");
    }
  };

  const canProceedStep1 = gender !== "";

  return (
    <VStack gap={6} align="stretch">
      {/* Progress Bar */}
      <VStack gap={2} align="stretch">
        <Flex justify="space-between" align="center">
          <Text fontSize="xs" color="gray.500" fontFamily="var(--font-poppins)">
            Step {currentStep} of {totalSteps}
          </Text>
          <Text fontSize="xs" color="var(--reppy-green)" fontWeight="bold">
            {Math.round(progress)}% Complete
          </Text>
        </Flex>
        <Progress.Root
          value={progress}
          size="sm"
          borderRadius="full"
          bg={{ base: "gray.200", _dark: "rgba(255,255,255,0.1)" }}
        >
          <Progress.Track>
            <Progress.Range bg="var(--reppy-green)" />
          </Progress.Track>
        </Progress.Root>
      </VStack>

      {/* Steps Content */}
      <Box position="relative" minH="500px" overflow="hidden">
        <AnimatePresence mode="wait" custom={1}>
          {/* Step 1: Gender Selection */}
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
                  <Sparkles size={32} color="var(--reppy-green)" />
                  <Heading
                    fontSize="2xl"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Let's Create Your Profile
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Start by selecting your gender
                  </Text>
                </VStack>

                <VStack gap={3} align="stretch">
                  <Text
                    fontSize="sm"
                    color={{ base: "gray.700", _dark: "gray.300" }}
                  >
                    Select Your Gender
                  </Text>

                  <Flex gap={3} flexDir="column">
                    {[
                      {
                        value: "male",
                        icon: FaMars,
                        label: "Male",
                        color: "#3b82f6",
                      },
                      {
                        value: "female",
                        icon: FaVenus,
                        label: "Female",
                        color: "#ec4899",
                      },
                    ].map((option) => (
                      <MotionButton
                        key={option.value}
                        onClick={() => setGender(option.value)}
                        h="auto"
                        py={5}
                        w="100%"
                        variant={gender === option.value ? "solid" : "outline"}
                        bg={
                          gender === option.value
                            ? "var(--reppy-green)"
                            : "transparent"
                        }
                        color={
                          gender === option.value
                            ? "black"
                            : { base: "black", _dark: "white" }
                        }
                        borderColor={
                          gender === option.value
                            ? "var(--reppy-green)"
                            : {
                                base: "gray.300",
                                _dark: "rgba(255,255,255,0.2)",
                              }
                        }
                        borderWidth="2px"
                        _hover={{
                          bg:
                            gender === option.value
                              ? "var(--reppy-green)"
                              : {
                                  base: "gray.50",
                                  _dark: "rgba(255,255,255,0.05)",
                                },
                        }}
                      >
                        <VStack gap={2}>
                          <Box
                            p={3}
                            borderRadius="full"
                            bg={
                              gender === option.value
                                ? "rgba(0,0,0,0.1)"
                                : `${option.color}20`
                            }
                          >
                            <option.icon
                              size={24}
                              color={
                                gender === option.value ? "black" : option.color
                              }
                            />
                          </Box>
                          <Text fontWeight="bold" fontSize="sm">
                            {option.label}
                          </Text>
                        </VStack>
                      </MotionButton>
                    ))}
                  </Flex>
                </VStack>
              </VStack>
            </MotionBox>
          )}

          {/* Step 2: Profile Information Form */}
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
                    Tell Us About Yourself
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Fill in your personal details
                  </Text>
                </VStack>

                <VStack gap={4} align="stretch">
                  {/* Nickname */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Field.Root required invalid={Boolean(errors.nickname)}>
                      <Field.Label
                        fontSize="xs"
                        color={{ base: "gray.700", _dark: "gray.300" }}
                      >
                        Nickname
                      </Field.Label>
                      <InputGroup startElement={<LuUser />}>
                        <Input
                          {...register("nickname")}
                          variant={"outline"}
                          placeholder="Bondo2"
                          size="lg"
                        />
                      </InputGroup>
                      {errors.nickname && (
                        <Field.ErrorText>
                          {errors.nickname.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </MotionBox>

                  {/* Bio */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Field.Root required invalid={Boolean(errors.bio)}>
                      <Field.Label
                        fontSize="xs"
                        color={{ base: "gray.700", _dark: "gray.300" }}
                      >
                        Bio
                      </Field.Label>
                      <InputGroup startElement={<LuFileText />}>
                        <Input
                          {...register("bio")}
                          variant={"outline"}
                          placeholder="Ana b7b aroo7 el gym kol youm."
                          size="lg"
                        />
                      </InputGroup>
                      {errors.bio && (
                        <Field.ErrorText>{errors.bio.message}</Field.ErrorText>
                      )}
                    </Field.Root>
                  </MotionBox>

                  {/* Birthday */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Field.Root required invalid={Boolean(errors.birthday)}>
                      <Field.Label
                        fontSize="xs"
                        color={{ base: "gray.700", _dark: "gray.300" }}
                      >
                        Birthday
                      </Field.Label>
                      <InputGroup startElement={<LuCalendar />}>
                        <Input
                          {...register("birthday")}
                          variant={"outline"}
                          placeholder="dd/mm/yyyy"
                          size="lg"
                          type="date"
                        />
                      </InputGroup>
                      {errors.birthday && (
                        <Field.ErrorText>
                          {errors.birthday.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </MotionBox>
                </VStack>
              </VStack>
            </MotionBox>
          )}

          {/* Step 3: Profile Picture */}
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
                  <Camera size={32} color="var(--reppy-green)" />
                  <Heading
                    fontSize="2xl"
                    fontFamily="var(--font-poppins)"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Choose Your Avatar
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Upload a profile picture or choose a default avatar
                  </Text>
                </VStack>

                <Flex justify="center" py={8}>
                  <Box position="relative">
                    <Avatar.Root
                      size="2xl"
                      bg="var(--reppy-green)"
                      color="white"
                      border="4px solid"
                      borderColor={{
                        base: "gray.200",
                        _dark: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <Avatar.Fallback>
                        <Camera size={40} />
                      </Avatar.Fallback>
                    </Avatar.Root>
                  </Box>
                </Flex>

                <Text fontSize="sm" textAlign="center" color="gray.500">
                  Profile picture selection will be available soon
                </Text>
              </VStack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>

      {/* Navigation Buttons */}
      <HStack gap={3}>
        {currentStep > 1 && (
          <MotionButton
            onClick={handleBack}
            variant="outline"
            flex={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ChevronLeft size={18} /> Back
          </MotionButton>
        )}

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            bg="var(--reppy-green)"
            color="black"
            fontWeight="bold"
            flex={1}
            disabled={currentStep === 1 && !canProceedStep1}
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
            _hover={{ bg: "var(--reppy-green)", opacity: 0.9 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner size="sm" mr={2} /> : null}
            {isSubmitting ? "" : "Create My Profile"}
          </Button>
        )}
      </HStack>

      <Text
        fontFamily="var(--font-poppins)"
        fontSize="2xs"
        color="gray.500"
        textAlign="center"
        lineHeight="tall"
      >
        By signing up, you agree to our{" "}
        <Link
          color="var(--reppy-green)"
          _hover={{ textDecoration: "underline" }}
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          color="var(--reppy-green)"
          _hover={{ textDecoration: "underline" }}
        >
          Privacy Policy
        </Link>
      </Text>
    </VStack>
  );
};

export default ProfileCreationPanel;
