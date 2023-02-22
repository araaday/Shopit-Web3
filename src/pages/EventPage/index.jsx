import { useLocation } from "react-router-dom";
import styled from "styled-components";

import events from "../../events.json";
import { ITEvent } from "../../helpers";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  height: fit-content;
  background-color: var(--dark);
  border: 5px solid var(--accent-2);
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 900;
`;
const Brand = styled.p`
  padding-top: 10px;
  font-size: 18px;
  font-weight: 700;
`;
const Desc = styled.p`
  margin: 70px 0px;
  font-size: 25px;
`;

const Supporting = styled.div`
  margin: 70px 0px;
  font-size: 20px;
`;

const Intruc = styled.p`
  margin: 30px 0px;
  font-size: 20px;
`;

const Heading = styled.h1``;

const Brands = styled.h3`
  margin-top: 60px;
  border: 3px solid var(--light);
  color: var(--dark);
  background-color: var(--warning);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OkBrands = styled.h3`
  margin-top: 60px;
  border: 3px solid var(--light);
  color: var(--dark);
  background-color: var(--success);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Criteria = styled.h3`
  margin-top: 35px;

  flex: 1;
  font-size: 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function EventPage() {
  const { search } = useLocation();
  const search_params = new URLSearchParams(search);
  const id = search_params.get("id") || "";
  const event = events.events.find((event) => event.id === id);
  const nft_required = Boolean(event.criteria.length);

  const criteria = [];
  let met_all = true;
  for (let i = 0; i < event.criteria.length; i++) {
    const { brand, condition, met } = event.criteria[i];
    const BrandsFactory = met ? OkBrands : Brands;
    criteria.push(
      <div key={i}>
        <BrandsFactory>{brand}</BrandsFactory>
        <Criteria>{condition}</Criteria>
      </div>
    );
    if (met_all && !met) met_all = false;
  }

  return (
    <div className="bg-bg-dark-gradient text-light">
      <Wrapper>
        <ImgContainer>
          <Image src={event.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{event.name}</Title>
          {nft_required ? <Brand>**NFT required**</Brand> : <></>}
          <Desc>{event.description}</Desc>
          <Intruc>
            If eligible claim your NFT pass and it will be sent to your wallet. Scan NFT on event
            day to enjoy perks and benefits
          </Intruc>

          <div className="btn-solid btn-accent-2 rounded-1 w-fc">
            <button
              className="btn p-3 rounded-1"
              type="button"
              {...(met_all
                ? { onClick: () => ITEvent().functions.mint(event.id, 1) }
                : { disabled: true, style: { opacity: 0.5 } })}
            >
              CLAIM EVENT PASS
            </button>
          </div>

          {nft_required ? (
            <Supporting>
              <Heading>Supporting Brands</Heading>

              {criteria}
            </Supporting>
          ) : (
            <></>
          )}
        </InfoContainer>
      </Wrapper>
    </div>
  );
}
