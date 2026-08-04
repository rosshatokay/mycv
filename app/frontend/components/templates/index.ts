import React from "react";
import { TemplateComponentProps } from "./types";

// Use eager: true to import components synchronously for SSR compatibility
const rawTemplates = import.meta.glob<{ default: React.ComponentType<TemplateComponentProps> }>(
  "./items/*/index.tsx",
  { eager: true }
)

export const TEMPLATE_REGISTRY: Record<string, React.ComponentType<TemplateComponentProps>> = {}

Object.keys(rawTemplates).forEach((path) => {
  const templateId = path.split("/")[2]

  if (templateId && rawTemplates[path].default) {
    TEMPLATE_REGISTRY[templateId] = rawTemplates[path].default
  }
})

export function getTemplate(templateId: string) {
  return TEMPLATE_REGISTRY[templateId] || TEMPLATE_REGISTRY['classic']
}