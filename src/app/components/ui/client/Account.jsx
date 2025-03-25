"use client";

import { useAccount } from "wagmi";
import Text from "../common/text";

// Make sure that this component is wrapped with ConnectKitProvider
const Account = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <Text variant='h3' color='secondary'>Connecting...</Text>;
  if (isDisconnected) return <Text  variant='h3' color='secondary'>Disconnected</Text>;
  return (
    <div>
      <Text  variant='h5' color='secondary'>Connected Wallet: {address}</Text>
    </div>
  );
};

export default Account;
