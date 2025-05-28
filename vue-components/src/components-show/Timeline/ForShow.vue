<script setup lang="ts">
import type { TimelineItem as TimelineItemType } from './types'
import Timeline from './Timeline.vue'

const timelineData: TimelineItemType[] = [
  {
    text: 'Wrote my first blog post ever on Medium',
    date: 'March 03 2017',
    category: {
      tag: 'medium',
      color: '#018f69',
    },
    link: {
      url: 'https://medium.com/@popflorin1705/javascript-coding-challenge-1-6d9c712963d2',
      text: 'Read more',
    },
  },
  {
    text: 'Started my first job as a Frontend Developer',
    date: 'May 01 2017',
    category: {
      tag: 'job',
      color: '#e17b77',
    },
    link: {
      url: 'https://www.linkedin.com/in/florin-pop-1705/',
      text: 'Read more',
    },
  },
  {
    text: 'Joined the YouTube community with my first video ever',
    date: 'June 15 2017',
    category: {
      tag: 'youtube',
      color: '#ff0000',
    },
    link: {
      url: 'https://www.youtube.com/watch?v=1g8a2d9f4k8',
      text: 'Watch video',
    },
  },
  {
    text: 'Launched my first online course on Udemy',
    date: 'August 20 2017',
    category: {
      tag: 'course',
      color: '#0073e6',
    },
    link: {
      url: 'https://www.udemy.com/course/javascript-essentials/',
      text: 'Enroll now',
    },
  },
]
</script>

<template>
  <Timeline :data="timelineData"></Timeline>
</template>
