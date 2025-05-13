import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Responsive from "../../helpers/ResponsiveDimensions/Responsive";
import { Colors } from "../../helpers/theme/colors";

const PaginationControls = ({
  currentPage,
  onPageChange,
  isNextDisabled,
  totalPages,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
      >
        <Text style={styles.pageButtonText}>◀</Text>
      </TouchableOpacity>

      {pages.map((pageNum, index) =>
        pageNum === "..." ? (
          <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
            ...
          </Text>
        ) : (
          <TouchableOpacity
            key={pageNum}
            onPress={() => onPageChange(pageNum)}
            style={[
              styles.pageButton,
              currentPage === pageNum && styles.activePageButton,
            ]}
          >
            <Text
              style={[
                styles.pageButtonText,
                currentPage === pageNum && styles.activePageButtonText,
              ]}
            >
              {pageNum}
            </Text>
          </TouchableOpacity>
        )
      )}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        style={[styles.pageButton, isNextDisabled && styles.disabledButton]}
      >
        <Text style={styles.pageButtonText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaginationControls;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Responsive.heightPx(2),
    flexWrap: "wrap",
  },
  pageButton: {
    paddingVertical: Responsive.heightPx(1),
    paddingHorizontal: Responsive.widthPx(3),
    marginHorizontal: Responsive.widthPx(1),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageButtonText: {
    fontSize: Responsive.font(4),
    color: Colors.blackColor,
  },
  activePageButton: {
    backgroundColor: Colors.primaryButtonColor,
  },
  activePageButtonText: {
    color: Colors.whiteColor,
  },
  ellipsis: {
    fontSize: Responsive.font(4),
    color: "#aaa",
    paddingHorizontal: Responsive.widthPx(1),
  },
});
