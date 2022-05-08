export const DragPlanSteps = [
  {
    target: "#plan_map_card_controls",
    content: `Use the controls to advance from step to step in your plan view your route progress`,
    disableBeacon: true,
  },
  {
    target: ".plan-col-right",
    content: `Set the travel modes, you can walk, drive, bike or take public transit, to change the order of your plan, this area is Draggable, you can drag the cards into the correct order you'd like to plan it. open a card for directions, or click the link in the card to view the location on google maps`,
  },
  {
    target: "#gmap_route_link",
    content: `You can view what you currently see in the map at any step on google maps by clicking here`,
  },
  {
    target: "#delete_location_links",
    content: `Check out these buisnesses on yelp that matched your search catergories, in this area you can also delete a location, dont worry you can always reset your plan by clicking the reset button on top of the draggable directions panel`,
  },
];

export const locationSteps = [
  {
    target: ".my-first-step",
    content:
      "Here is where youll set the starting location for your plan, try looking for a popular spot near you i.e. the walmart down the block or a popular neighborhood or local spot",
  },
  {
    target: ".second-step",
    content:
      "You can also use geolocation if youd like to set the start of the plan to your current location, you'll see a big purple dot representing your location",
  },
  {
    target: ".top-container-searchbox",
    content:
      "To set the starting point of your plan, youll have to use these controls, but you can click anywhere on the map to scope out an area, and we'll show you a photo if we have one, clicking on the map won't set your starting location for created plan though, for that youll have to use the searchbar or geolocation we just showed",
    disableBeacon: true,
  },
  {
    target: ".generate-plan-link",
    content: "You can create a plan using this location",
  },
  {
    target: "#header_plan_btn",
    content:
      "Look for this button in the header to also create a plan using your selected location",
    disableBeacon: true,
  },
];

export const dragPlanTourStyle = {
  options: {
    arrowColor: "#e3ffeb",
    backgroundColor: "#e3ffeb",
    overlayColor: "rgba(79, 26, 0, 0.4)",
    primaryColor: "#000",
    textColor: "#004a14",
  },
};
