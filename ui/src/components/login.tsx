import {
  Group,
  Button,
  Container,
  MantineProvider,
  Title,
  Box
} from "@mantine/core";

export default function Login() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Container size="xs" style={{overflow: "hidden", marginTop: "20rem", display: "flex", flexDirection: "column" }}>
        <Box>
          <Title ta="center" order={2} mb="xl">
            Inicia sesión con Google
          </Title>
          <Group justify="center">
            <Button
              color="blue"
              onClick={() => (window.location.href = "/auth/google")}
            >
              Iniciar sesión
            </Button>
          </Group>
        </Box>
      </Container>
    </MantineProvider>
  )
}