"use client";

import { useState, type FormEvent } from "react";

type LogLine = { type: "command" | "output" | "error"; text: string };

const routes: Record<string, string> = {
  about: "about",
  work: "work",
  projects: "projects",
  teaching: "teaching",
  contact: "contact",
};

const helpText =
  "available: cd about, cd work, cd projects, cd teaching, cd contact, help, clear";

function parseCommand(raw: string): { command: string; arg?: string } {
  const trimmed = raw.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);

  if (parts[0] === "cd" && parts[1]) {
    return { command: "cd", arg: parts[1] };
  }
  if (parts.length === 1 && routes[parts[0]]) {
    return { command: "cd", arg: parts[0] };
  }
  return { command: parts[0] ?? "" };
}

export function useTerminalNav() {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("");
  const [log, setLog] = useState<LogLine[]>([]);

  function activate() {
    setActive(true);
  }

  function reset() {
    setLog([]);
    setValue("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = value;
    if (!raw.trim()) return;

    const { command, arg } = parseCommand(raw);
    const newLog: LogLine[] = [...log, { type: "command", text: raw }];

    if (command === "clear") {
      setLog([]);
      setValue("");
      return;
    }

    if (command === "help") {
      newLog.push({ type: "output", text: helpText });
      setLog(newLog);
      setValue("");
      return;
    }

    if (command === "cd" && arg && routes[arg]) {
      newLog.push({ type: "output", text: `→ ${arg}` });
      setLog(newLog);
      setValue("");
      const el = document.getElementById(routes[arg]);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    newLog.push({ type: "error", text: `command not found: ${raw} — try 'help'` });
    setLog(newLog);
    setValue("");
  }

  return { active, activate, value, setValue, log, handleSubmit, reset };
}
