import React from 'react';
import { Button } from '@chakra-ui/button';
import { Backpack } from 'react-kawaii';
import { Checkbox, Image, useColorModeValue } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Box, Spacer, Text, Link } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import { Select } from '@chakra-ui/select';

import BannerWhite from '../../../assets/img/bannerWhite.svg';
import BannerBlack from '../../../assets/img/bannerBlack.svg';
import TermsOfUse from '../components/termsOfUse';
import { ViewIcon, WarningTwoIcon } from '@chakra-ui/icons';

const Welcome = () => {
  const Banner = useColorModeValue(BannerBlack, BannerWhite);
  const refWallet = React.useRef();
  const refImport = React.useRef();

  return (
    <>
      <Box
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        position="relative"
      >
        {/* Header */}
        <Box position="absolute" top="9">
          <Image draggable={false} width="85px" src={Banner} />
        </Box>
        {/* Footer */}
        <Box position="absolute" bottom="3" fontSize="xs">
          <Link
            onClick={() => window.open('https://namiwallet.io')}
            color="GrayText"
          >
            namiwallet.io
          </Link>
        </Box>
        <Box h="12" />
        <Text fontWeight="medium" fontSize="3xl">
          Welcome
        </Text>
        <Text
          color="grey"
          fontWeight="light"
          fontSize="sm"
          textAlign="center"
          lineHeight="1.2"
        >
          Let's get started with creating a wallet.
        </Text>
        <Box h="8" />
        <Backpack size={120} mood="blissful" color="#61DDBC" />
        <Box height="8" />
        <Button
          display="inline-flex"
          onClick={() => {
            refWallet.current.openModal();
          }}
          colorScheme="teal"
          size="md"
        >
          New Wallet
        </Button>
        <Box height="4" />
        <Button
          onClick={() => {
            refImport.current.openModal();
          }}
          colorScheme="orange"
          size="sm"
        >
          Import
        </Button>
      </Box>
      <WalletModal ref={refWallet} />
      <ImportModal ref={refImport} />
    </>
  );
};

const WalletModal = React.forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accept, setAccept] = React.useState(false);
  const history = useHistory();

  const termsRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));
  return (
    <>
      <Modal size="xs" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">Create a wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm">
              Make sure no one is watching the screen, while the seed phrase is
              visible. <ViewIcon />
            </Text>
            <Box h="4" />
            <Box display="flex" alignItems="center" justifyContent="center">
              <Checkbox onChange={(e) => setAccept(e.target.checked)} />
              <Box w="2" />
              <Text>
                I accept{' '}
                <Link
                  onClick={() => termsRef.current.openModal()}
                  textDecoration="underline"
                >
                  Terms of use
                </Link>
              </Text>
              <Box h="2" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              isDisabled={!accept}
              colorScheme="teal"
              onClick={() => history.push('/createWallet/generate')}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TermsOfUse ref={termsRef} />
    </>
  );
});

const ImportModal = React.forwardRef((props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const [accept, setAccept] = React.useState(false);
  const [select, setSelect] = React.useState(null);

  const termsRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openModal() {
      onOpen();
    },
  }));
  return (
    <>
      <Modal size="xs" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">Import a wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" fontWeight="bold">
              <WarningTwoIcon mr="1" />
              Importing Daedalus or Yoroi
            </Text>
            <Spacer height="1" />
            <Text fontSize="sm">
              Nami Wallet will just track the first address of these wallets. If
              you want to use/see your whole balance, you have to send all funds
              to the first address! <br /> (You will find the address inside
              Nami wallet)
            </Text>
            <Spacer height="4" />
            <Text fontSize="sm">
              Make sure no one is watching the screen, while the seed phrase is
              visible. <ViewIcon />
            </Text>
            <Spacer height="6" />
            <Select
              size="sm"
              rounded="md"
              onChange={(e) => setSelect(e.target.value)}
              placeholder="Choose seed phrase length"
            >
              <option value="15">15-word seed phrase</option>
              <option value="24">24-word seed phrase</option>
            </Select>
            <Box h="5" />
            <Box display="flex" alignItems="center" justifyContent="center">
              <Checkbox onChange={(e) => setAccept(e.target.checked)} />
              <Box w="2" />
              <Text>
                I accept{' '}
                <Link
                  onClick={() => termsRef.current.openModal()}
                  textDecoration="underline"
                >
                  Terms of use
                </Link>
              </Text>
              <Box h="2" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              isDisabled={!select || !accept}
              colorScheme="teal"
              onClick={() =>
                history.push({
                  pathname: '/createWallet/import',
                  seedLength: parseInt(select),
                })
              }
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TermsOfUse ref={termsRef} />
    </>
  );
});

export default Welcome;
