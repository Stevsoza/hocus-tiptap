import { Card, Title, Text, Group, Switch, ActionIcon } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

interface ProfileProps {
    displayName: string;
    emails: { value: string }[];
}

const handleLogout = () => {
  window.location.href = "/logout";
};

export default function ProfileView({ user, colorSchemeChange, actualColorScheme}: { user: ProfileProps, colorSchemeChange: any, actualColorScheme: string }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3}>Perfil del usuario</Title>
      <Text mt="md">Nombre: {user.displayName}</Text>
      <Text>Email: {user.emails[0].value}</Text>
      <Group mt="md" mr="md">
        <Switch label="Modo oscuro" checked={actualColorScheme === "dark"} onChange={(e) => colorSchemeChange(e.currentTarget.checked ? 'dark' : 'light')} />
        <ActionIcon color="red" size={32} onClick={handleLogout}> <IconLogout size={24} /> </ActionIcon>
      </Group>
    </Card>
  );
}
