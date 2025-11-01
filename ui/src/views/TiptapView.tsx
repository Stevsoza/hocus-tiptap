import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'


interface ProfileProps {
  id: string;
  displayName: string;
  emails: { value: string }[];
}


export default function TiptapView({ user, actualColorScheme }: { user: ProfileProps, actualColorScheme: string }) {
  return <SimpleEditor user={user} actualColorScheme={actualColorScheme}  />
}