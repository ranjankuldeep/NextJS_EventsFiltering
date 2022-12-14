import Link from "next/dist/client/link";
import classes from "./Button.module.css";

function Button(props) {
    if(props.link){
        return (
            <Link href={props.link}>
              <a className={classes.btn}>{props.children}</a>
            </Link>
          );
    }

    return(
        <button onClick={props.onClick}>{props.children}</button>
    )

}
export default Button;
