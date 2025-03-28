import React from "react";
import { Text, Button, Input, Divider } from "../";

export const ContractInteractions = () => {
  return (
    <div className="w-full h-full min-h-max flex flex-col items-center justify-center border border-neutral-600 rounded-md py-10">
      <div className="head-txt flex items-center justify-center gap-2.5">
        <span className="">
          {/* TODO : change it to dynamic value */}
          <Text variant="h1" align="center" weight="semibold">
            USDT
          </Text>
        </span>
        <Text variant="h1" weight="semibold" align="center">
          Contract Interactions
        </Text>
      </div>

      <Divider className="w-full h-1 bg-neutral-300" />

      {/* Read Contract Section */}
      <div className="w-full flex flex-col items-start justify-start px-5 gap-4">
        <Text variant="h2" align="left" weight="semibold">
          Read Contract
        </Text>
        <div className="flex flex-col items-start justify-center ">
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Name:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Decimals:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Symbols:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Balance:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Total Supply:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Owner Address:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Text variant="h5" weight="semibold">
              Allowance:
            </Text>
            <Text variant="body">USDT</Text>
          </div>
        </div>
      </div>

      <Divider className="w-full h-1 bg-neutral-300" />

      {/* Write  Contract Section */}
      <div className="w-full h-full flex flex-col items-start justify-start px-5 gap-4">
        <Text variant="h2" align="left" weight="semibold">
          Read Contract
        </Text>
        <div className="flex flex-col items-start justify-center ">
          {/* Mint Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Mint
            </Text>
            <Input type="number" placeholder="Amount to mint" />
            <Button variant="default">Mint</Button>
          </div>

          <Divider className=" w-full h-1 bg-neutral-300" />
          {/* Burn Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Burn
            </Text>
            <Input type="number" placeholder="Amount to burn" />
            <Button variant="default">Burn</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Approve Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Approve
            </Text>
            <Input type="number" placeholder="Spender" />
            <Input type="number" placeholder="Amount" />
            <Button variant="default">Approve</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer From Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Transfer From
            </Text>
            <Input type="number" placeholder="Spender" />
            <Input type="number" placeholder="Recipient" />
            <Input type="number" placeholder="Amount" />
            <Button variant="default">Transfer From</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Increase Allowance Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Increase Allowance
            </Text>
            <Input type="number" placeholder="Spender" />
            <Input type="number" placeholder="Add a value" />
            <Button variant="default">Increase Allowance</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />

          {/* Transfer Section */}
          <div className="flex flex-col items-start gap-2.5">
            <Text variant="h4" weight="semibold" align="left">
              Transfer
            </Text>
            <Input type="number" placeholder="Recipient" />
            <Input type="number" placeholder="Amount" />
            <Button variant="default">Transfer</Button>
          </div>

          <Divider className="w-full h-1 bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};
