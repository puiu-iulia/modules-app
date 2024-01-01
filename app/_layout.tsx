import { Stack } from 'expo-router';

const Layout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ title: "Native modules"}} />
  </Stack>
);

export default Layout;