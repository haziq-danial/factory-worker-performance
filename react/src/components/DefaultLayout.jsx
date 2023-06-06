import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {Outlet} from "react-router-dom";

const Links = [
    {
        name:'Dashboard',
        path: '/'
    }
];

// eslint-disable-next-line react/prop-types
const NavLink = ({ children: {name, path} }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        sx={{
            color: 'white'
        }}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('blue.200', 'blue.700'),
            color: 'black'
        }}
        href={path}>
        {name}
    </Link>
);

export default function DefaultLayout() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box bg={useColorModeValue('blue.700')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box sx={{
                            color: 'white'
                        }}>Logo</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Container maxW={'90%'} p={'6'}>
                <Outlet />
            </Container>
            {/*<Outlet/>*/}
        </>
    );
}
