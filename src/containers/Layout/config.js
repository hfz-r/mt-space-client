import { map } from 'ramda';
import { data } from 'utils/base-data';

export const navConfig = map(d => ({
  label: d.label,
  href: d.baseHref,
  children: map(
    c => ({
      label: c.label,
      subLabel: c.description,
      tags: c.tags,
      href: c.href.replace('$', d.baseHref),
    }),
    d.children
  ),
}))(data);
