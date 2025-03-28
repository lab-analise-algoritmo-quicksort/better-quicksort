export interface IComparable<EntryType> {
  /**
   * Compare two Entities alphabetically.
   *
   * @param entityB: A second entity to compare with.
   * @returns {-1 | 0 | 1} -1 if base entity is less than B, 0 if equal, 1 if baseEntity is greater than B.
   */
  compareTo(entityB: EntryType): -1 | 0 | 1;
}
