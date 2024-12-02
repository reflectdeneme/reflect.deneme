import { sliderService } from "@/_service/slider/slider.service";

const TheSquad = async () => {
  const slides: { items: { userName: string }[] } =
    await sliderService.getAllSlider({
      pageNumber: 1,
      pageSize: 1000,
    });

  return (
    <>
      <div>xxxxxxxxxxxxxxxx</div>
      {slides.items?.map((items) => (
        <div key={items.userName}>{items.userName}</div>
      ))}
    </>
  );
};

export default TheSquad;
