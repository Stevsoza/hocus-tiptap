import { Card, Title, Switch, Stack } from "@mantine/core";

export default function SettingsView({ colorSchemeChange, actualColorScheme }: { colorSchemeChange: any, actualColorScheme: string }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3}>Configuración</Title>
      <Stack mt="md">
        <Switch label="Modo oscuro" checked={actualColorScheme === "dark"} onChange={(e) => colorSchemeChange(e.currentTarget.checked ? 'dark' : 'light')} />
        <Switch label="Notificaciones" />
      </Stack>
    </Card>
  );
}
