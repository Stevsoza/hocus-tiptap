import '@mantine/core/styles.css';
import { useEffect, useState } from "react";
import Login from "./components/login";
import {
  Stack,
  Switch,
  AppShell,
  Tabs,
  Avatar,
  Group,
  Text,
  Container,
  MantineProvider,
  ActionIcon,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useLocalStorage } from '@mantine/hooks';
import { IconHome, IconUser, IconSettings } from "@tabler/icons-react";
import { useViewManager } from "./core/ViewManager";
import { type ViewKey } from "./core/views";

interface GoogleUser {
  id: string;
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
}

type ColorScheme = 'light' | 'dark'

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<GoogleUser | null>(null);
  const { currentView, setView, ViewComponent } = useViewManager("home");

  // 🔹 Obtener sesión actual del backend
  useEffect(() => {
    fetch("/api/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (!data.message) setUser(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(colorScheme)
  }, [colorScheme])

  if (loading) {
    return (
      <MantineProvider defaultColorScheme={colorScheme}>
        <div style={{ color: "white", textAlign: "center", marginTop: "40vh" }}>
          Cargando...
        </div>
      </MantineProvider>
    );
  }

  if (!user) {
    return (
      <Login />
    );
  }

  return (
    <MantineProvider defaultColorScheme="dark" forceColorScheme={colorScheme}>
      <AppShell style={{height: "100%"}} padding="md">
        {/* <AppShell.Header p="sm">
          <Group justify="space-between">
            <Group>
              <Avatar src={user.photos[0].value} radius="xl" />
              <div>
                <Text fw={500}>{user.displayName}</Text>
                <Text fz="sm" c="dimmed">
                  {user.emails[0].value}
                </Text>
              </div>
            </Group>
            <Group mt="md" mr="md">
              <Switch label="Modo oscuro" checked={colorScheme === "dark"} onChange={(e) => setColorScheme(e.currentTarget.checked ? 'dark' : 'light')} />
              <ActionIcon color="red" size={32} onClick={handleLogout}> <IconLogout size={24} /> </ActionIcon>
            </Group>
          </Group>
        </AppShell.Header> */}

        <AppShell.Main style={{ height: "2rem" }}>
            <Tabs
              defaultValue="home"
              value={currentView}
              variant="outline"
              radius="md"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
              onChange={(val) => setView(val as ViewKey)}
            >
              <Tabs.List mb="md">
                <Tabs.Tab value="home" leftSection={<IconHome size={18} />}>
                  Inicio
                </Tabs.Tab>
                <Tabs.Tab value="profile" leftSection={<IconUser size={18} />}>
                  Perfil
                </Tabs.Tab>
                <Tabs.Tab value="tiptap" leftSection={<IconSettings size={18} />}>
                  Tiptap
                </Tabs.Tab>
              </Tabs.List>
              <Container 
                fluid
                style={{
                  width: "100%",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                }}
              >
                <ViewComponent user={user} actualColorScheme={colorScheme}  colorSchemeChange = {setColorScheme} style={{flex: 1, borderRadius: "5px"}} />
              </Container>
            </Tabs>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
