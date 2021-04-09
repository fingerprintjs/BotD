import {getProperties} from "../misc";

export default function getDocumentProperties(): string[] {
    return getProperties(window.document)
}