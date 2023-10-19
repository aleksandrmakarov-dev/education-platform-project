function TitleSearchOptions(searchQuery?: string) {
  return searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {};
}

export { TitleSearchOptions };
