import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Centralized navigation helpers keep locale-aware links consistent across the app.
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
