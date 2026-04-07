"use client";
import { useState } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import React from "react";

type Props = {
  value: string[];
  availableTags: string[];
  onChange: (tags: string[]) => void;
};

export function TagsComboBox({ value, availableTags, onChange }: Props) {
  const anchor = useComboboxAnchor();

  // The available tags
  const [tags, setTags] = useState<string[]>(availableTags);

  // hold the input value if they enter a new tag
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddNew = () => {
    const trimmed = inputValue.trim();
    // Prevent adding empty tags to the array
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      // If the tag is not already in the available tags, add it
      setTags((prev) => [...prev, trimmed]);
    }
    if (!value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      handleAddNew();
    }
  };
  return (
    <Combobox
      multiple
      autoHighlight
      items={availableTags}
      value={value}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onValueChange={onChange}
    >
      <ComboboxChips ref={anchor} className="w-full">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput onKeyDown={handleKeyDown} />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={handleAddNew}
          >
            Add &quot;{inputValue}&quot;
          </button>
        </ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
