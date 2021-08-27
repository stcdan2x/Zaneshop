

const Rating = (props) => {
   return (
      <div>
         <span>
            <i style={props.style} className={props.value >= 1 ? "fa fa-star" : props.value >= 0.5 ? "fas fa-star-half-alt" : "far fa-star" }>
            </i>
         </span>
         <span>
            <i style={props.style} className={props.value >= 2 ? "fa fa-star" : props.value >= 1.5 ? "fas fa-star-half-alt" : "far fa-star" }>
            </i>
         </span>
         <span>
            <i style={props.style} className={props.value >= 3 ? "fa fa-star" : props.value >= 2.5 ? "fas fa-star-half-alt" : "far fa-star" }>
            </i>
         </span>
         <span>
            <i style={props.style} className={props.value >= 4 ? "fa fa-star" : props.value >= 3.5 ? "fas fa-star-half-alt" : "far fa-star" }>
            </i>
         </span>
         <span>
            <i style={props.style} className={props.value >= 5 ? "fas fa-star" : props.value >= 4.5 ? "fas fa-star-half-alt" : "far fa-star" }>
            </i>
         </span>
            <span> {props.text || ""} </span>   
      </div>
   );
};

Rating.defaultProps = {
   style: {
      color: "Goldenrod"
   }
}

export default Rating;
