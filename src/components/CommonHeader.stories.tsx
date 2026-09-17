import type { Meta, StoryObj } from '@storybook/tanstack-react';
import { expect, userEvent, within } from 'storybook/test';

import { CommonHeader } from './CommonHeader';

const meta = {
  title: 'Components/CommonHeader',
  component: CommonHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CommonHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MenuOpened: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', { name: 'メニューを開く' });
    await userEvent.click(openButton);

    const drawer = canvasElement.querySelector('[class*="drawerOpen"]');
    await expect(drawer).not.toBeNull();
    await expect(canvas.getByText('買い物リスト')).toBeInTheDocument();
    await expect(canvas.getByText('変更履歴')).toBeInTheDocument();
  },
};

export const MenuClosedAfterNavClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'メニューを開く' }),
    );
    await expect(
      canvasElement.querySelector('[class*="drawerOpen"]'),
    ).not.toBeNull();

    const navLink = canvas.getByText('買い物リスト');
    await userEvent.click(navLink);

    await expect(
      canvasElement.querySelector('[class*="drawerOpen"]'),
    ).toBeNull();
  },
};
