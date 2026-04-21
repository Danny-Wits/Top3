import React from 'react';
import { Container, Title, Text, Accordion, Paper, Box } from '@mantine/core';

export default function FAQ() {
  return (
    <Container size="sm" px="md" py="xl">
      <Box mb="xl">
        <Title order={2} fw={800} mb="xs">Frequently Asked Questions</Title>
        <Text c="dimmed">Everything you need to know about Top 3 and how the voting works.</Text>
      </Box>

      <Paper p="md" radius="md" withBorder shadow="sm">
        <Accordion variant="separated" radius="md">
          <Accordion.Item value="what-is-top3">
            <Accordion.Control fw={600}>What is Top 3?</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" c="dimmed" lh={1.6}>
                Top 3 is a voting platform where classmates can vote for each other in various fun
                and entertaining superlative categories (e.g., "Class Clown", "Most Likely to Succeed").
                It's designed to be a lighthearted and positive experience for everyone!
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="how-to-vote">
            <Accordion.Control fw={600}>How do I submit my votes?</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" c="dimmed" lh={1.6}>
                Once you log in, you will see a list of categories on the dashboard. Click on any category, 
                and you can select exactly 3 different peers from the list. Your votes will be saved automatically, 
                and that category will be marked as "Voted".
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="change-votes">
            <Accordion.Control fw={600}>Can I change my vote later?</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" c="dimmed" lh={1.6}>
                Currently, once you complete your 3 votes for a category, it is locked in. If you 
                need to make a change, contact the class representative or the developer.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="anonymous">
            <Accordion.Control fw={600}>Are my votes anonymous?</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" c="dimmed" lh={1.6}>
                Yes, mostly. While the system registers that your account has voted so you can't vote twice 
                in the same category, the final leaderboard aggregates all votes without publicly displaying 
                who voted for whom.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
    </Container>
  );
}
