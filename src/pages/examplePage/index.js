import { sharedStyles } from "../../shared/sharedStyles";
import { styles } from "./config";
import { applyStyles } from "../../helpers/applyStyles";

applyStyles({
    ...sharedStyles,
    ...styles
});