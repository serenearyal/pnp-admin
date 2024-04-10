"use client";

import React, { useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length == 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <Command>
      <div className="flex gap-1 flex-wrap">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button className="m-1" onClick={() => onRemove(collection._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <CommandInput
        placeholder={placeholder}
        value={inputValue}
        onValueChange={setInputValue}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />

      <div className="relative mt-2">
        {open && (
          <CommandList>
            <CommandGroup>
              {selectables.map((collection) => (
                <CommandItem
                  key={collection._id}
                  // onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    onChange(collection._id);
                    setInputValue("");
                  }}
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </div>

      {/* <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList> */}
    </Command>
  );
};

export default MultiSelect;
