import React from 'react';
import { Card } from 'react-bootstrap';

interface InfoCardProps {
  title: string;
  info: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, info }) => {
  return (
    <Card className="location-card">
      <Card.Body>
        <Card.Text>
          <strong>{title}:</strong> {info || 'Unknown'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
