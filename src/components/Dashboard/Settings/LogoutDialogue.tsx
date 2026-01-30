import {
  Dialog,
  CloseButton,
  Portal,
  Icon,
  IconButton,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutDialog = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          justifyContent="flex-start"
          borderColor="red.500"
          color="red.500"
          _hover={{
            bg: "red.50",
            _dark: { bg: "rgba(239, 68, 68, 0.1)" },
          }}
        >
          Sign out
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: 4, md: 0 }}
        >
          <Dialog.Content
            w="100%"
            maxW={{ base: "90%", md: "400px" }}
            borderRadius="md"
          >
            <Dialog.Header>
              <Dialog.Title>Confirm Logout</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Are you sure you want to log out?</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">No, Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorScheme="red" onClick={() => signOut()}>
                Yes, log me out
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default LogoutDialog;
