import React from 'react';
import styled from 'styled-components';

// Card Styles
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #E6BBAD;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  max-width: 400px; /* Adjust as needed */
  width: 100%;
  box-sizing: border-box; /* Ensure padding and borders are included in the element's total width and height */
`;

const CardHeading = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 14px;
  margin-bottom: 15px;
  max-width: 100%; /* Ensure the max width of the heading is the width of the card */
  word-wrap: break-word; /* Allow text to wrap to the next line */
  text-align: center;
`;

const CardContent = styled.div`
  width: 100%;
  font-size: 14px;
  color: #000;
  text-align: center;
`;

const CardImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #000;
`;

const DetailsListItem = styled.li`
  margin-bottom: 10px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow wrapping to next line if there isn't enough space */
  justify-content: center; /* Center the cards horizontally */
  gap: 20px; /* Space between cards */
`;

const SectionSubheading = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const GitHubLink = styled.a`
  color: #007bff;
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 15px;
  display: block;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`;

// InfoDisplay Component
const InfoDisplay = ({ sections, filterSection }) => {
  if (!sections || sections.length === 0) return <div>No data available</div>;

  const filteredSections = filterSection
    ? sections.filter(section => section.title === filterSection)
    : sections;

  if (filteredSections.length === 0) return <div>No cards available for this section</div>;

  const sectionName = filteredSections.length > 0 ? filteredSections[0].title : '';

  return (
    <>
      {sectionName && <SectionSubheading>{sectionName}</SectionSubheading>}
      <CardsContainer>
        {filteredSections.map((section, index) => (
          <CardContainer key={index}>
            {section.image ? (
              <CardImage src={section.image} alt={`${section.title} image`} />
            ) : (
              section.github && (
                <GitHubLink href={section.github} target="_blank" rel="noopener noreferrer">
                  View source
                </GitHubLink>
              )
            )}
            <CardHeading>{section.description}</CardHeading>
            <CardContent>
              {Array.isArray(section.details) ? (
                <DetailsList>
                  {section.details.map((detail, i) => (
                    <DetailsListItem key={i}>{detail}</DetailsListItem>
                  ))}
                </DetailsList>
              ) : (
                <p>Details not available</p>
              )}
            </CardContent>
          </CardContainer>
        ))}
      </CardsContainer>
    </>
  );
};

export default InfoDisplay;
