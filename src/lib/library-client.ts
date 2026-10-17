import type { LibraryCollection, LibrarySnapshot } from "./library-types";

type LibraryPayload = {
  library: LibrarySnapshot;
  collection?: LibraryCollection;
};

async function requestLibrary(
  path: string,
  method: string,
  body?: Record<string, unknown>,
) {
  const response = await fetch(path, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = (await response.json().catch(() => null)) as
    (LibraryPayload & { error?: string }) | null;
  if (
    !response.ok ||
    !payload ||
    !Array.isArray(payload.library?.savedSkillPaths)
  ) {
    const message =
      payload && typeof payload.error === "string" && payload.error.length < 180
        ? payload.error
        : "That action could not be completed. Please try again.";
    throw new Error(message);
  }
  return payload;
}

export function fetchLibrary() {
  return requestLibrary("/api/library", "GET");
}

export function saveSkill(skillPath: string) {
  return requestLibrary("/api/library/saved", "POST", { skillPath });
}

export function unsaveSkill(skillPath: string) {
  return requestLibrary("/api/library/saved", "DELETE", { skillPath });
}

export function createCollection(input: { title: string; skillPath?: string }) {
  return requestLibrary("/api/library/collections", "POST", input);
}

export function updateCollection(id: string, input: { title: string }) {
  return requestLibrary(`/api/library/collections/${id}`, "PATCH", input);
}

export function deleteCollection(id: string) {
  return requestLibrary(`/api/library/collections/${id}`, "DELETE");
}

export function addSkillToCollection(id: string, skillPath: string) {
  return requestLibrary(`/api/library/collections/${id}/skills`, "POST", {
    skillPath,
  });
}

export function removeSkillFromCollection(id: string, skillPath: string) {
  return requestLibrary(`/api/library/collections/${id}/skills`, "DELETE", {
    skillPath,
  });
}
