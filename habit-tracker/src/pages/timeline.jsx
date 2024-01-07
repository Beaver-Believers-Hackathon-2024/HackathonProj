import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function AlternateTimeline() {
    const items = ['Eat', 'Code', 'Sleep', 'Repeat'];

    return (
        <Timeline position="alternate">
        {Array.from({ length: 30 }).map((_, index) => (
            <TimelineItem key={index}>
            <TimelineSeparator>
                <TimelineDot />
                {index < 29 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{items[index % 4]}</TimelineContent>
            </TimelineItem>
        ))}
        </Timeline>
    );
    }
