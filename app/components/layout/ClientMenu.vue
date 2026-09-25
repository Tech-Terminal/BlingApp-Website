<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "reka-ui";

const { user, signOut } = useAuth();
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger class="inline-flex cursor-pointer items-center gap-2">
      <div class="inline-flex items-center gap-1">
        <Icon
          name="hugeicons:arrow-down-01"
          size="20"
          class="text-txt-caption"
        />
        <p class="text-lg font-medium text-txt-caption">{{ user?.name }}</p>
      </div>
      <UiAvatar :src="user!.image!" :fallback="user!.name!" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @select="signOut">{{ $t("signOut") }}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
